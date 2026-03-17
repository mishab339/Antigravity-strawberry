'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function createOrder(formData: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    quantity: number;
    totalPrice: number;
}) {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return { error: 'Please log in to complete your purchase.' }
    }

    try {
        // 1. Create native Razorpay Order
        const amountInPaise = formData.quantity * 100 // ₹1 per bottle

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                fullName: formData.fullName,
                email: formData.email,
                quantity: formData.quantity.toString()
            }
        })

        // 2. Store Order in Supabase
        const { error: dbError } = await supabase
            .from('orders')
            .insert([
                {
                    user_id: user.id,
                    quantity: formData.quantity,
                    total_price: formData.totalPrice,
                    status: 'Pending',
                    full_name: formData.fullName,
                    email: formData.email,
                    phone_number: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    zip_code: formData.zipCode,
                    state: formData.state,
                    razorpay_link_id: order.id
                }
            ])

        if (dbError) {
            console.error('Database Error:', dbError)
            return { error: 'Failed to record order. Please contact support.' }
        }

        revalidatePath('/profile')
        return {
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        }

    } catch (error: any) {
        console.error('Razorpay Error:', error)
        return { error: error.message || 'Payment initiation failed.' }
    }
}
