import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-2xl border border-black/5 bg-white">
      <Spline
        scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
      <div className="absolute inset-x-0 bottom-8 px-6 sm:px-10">
        <div className="pointer-events-none mx-auto max-w-5xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Track Your Money with Clarity
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            A minimalist finance dashboard for income, expenses, donations, and investments—visualized beautifully.
          </p>
        </div>
      </div>
    </section>
  );
}
