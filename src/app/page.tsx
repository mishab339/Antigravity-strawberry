import ImageCanvas from "@/components/ImageCanvas";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Ingredients from "@/components/Ingredients";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="relative bg-transparent min-h-screen font-sans selection:bg-red-500/30">
      <ImageCanvas />

      <div className="relative z-10">
        <Hero />
        <div className="h-[100vh]" />
        <Story />
        <div className="h-[100vh]" />
        <Ingredients />
        <div className="h-[100vh]" />
        <CTA />
      </div>
    </main>
  );
}
