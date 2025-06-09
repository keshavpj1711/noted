import WhyNoteImg from '../../assets/whyNote.png';

function WhyNote() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-10 py-10 md:py-16 bg-transparent"> {/* Adjusted height */}
      {/* Left: Illustration */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Why Note Taking?
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-xl lg:max-w-2xl">
          Our minds are incredible, but they're not perfect storage devices. 
          Ideas come and go, important details fade, and brilliant thoughts slip away. 
          Note-taking gives your mind the freedom to think creatively while ensuring nothing important gets lost. 
          It's your external brain—always ready, never forgets.
        </p>
      </div>

      {/* Right: Text Content */}
      <div className="flex-1 flex justify-end items-center mb-10 lg:mb-0 lg:ml-10 lg:text-right">
        <img
          src={WhyNoteImg}
          alt="Note taking illustration with a scroll and feather"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg " 
        />
      </div>

    </section>
  )
}

export default WhyNote