"use client";

export default function VideoSection() {
  return (
    <section className="py-20 bg-[#F4E1D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-4">
            Einblick
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-4">
            Wie funktioniert{" "}
            <span className="text-[#2F4F4F]">Prana-Heilung?</span>
          </h2>
          <p className="text-[#4B2E1A]/70 max-w-2xl mx-auto">
            Erfahren Sie mehr über unsere ganzheitlichen Behandlungen und die
            heilende Kraft der Prana-Massage.
          </p>
        </div>

        {/* Video Embed */}
        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
          <video
            width="100%"
            height="100%"
            controls
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/studio.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

