function HowItWorks() {

  const steps = [
    {
      id: 1,
      emoji: "🍱",
      title: "Donate Food",
      description: "Share extra food from homes, restaurants, and events easily.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      textColor: "text-orange-500",
    },
    {
      id: 2,
      emoji: "📍",
      title: "Nearby Match",
      description: "NGOs and volunteers receive nearby food donation alerts.",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      textColor: "text-green-500",
    },
    {
      id: 3,
      emoji: "🤝",
      title: "Help Communities",
      description: "Food reaches people who truly need support quickly.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      textColor: "text-blue-500",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            How It Works
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Simple steps to reduce food waste and help communities
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`${step.bgColor} ${step.borderColor} border p-10 rounded-3xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 relative overflow-hidden`}
            >
              {/* 🔢 STEP NUMBER BADGE: பார்க்க இன்னும் பிரீமியமா மாத்தியாச்சு da! */}
              <div className="absolute top-4 right-6 text-xs font-bold bg-white/80 px-3 py-1 rounded-full text-gray-400 uppercase tracking-wider">
                Step 0{step.id}
              </div>

              <div className="text-6xl mb-6 select-none">
                {step.emoji}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;