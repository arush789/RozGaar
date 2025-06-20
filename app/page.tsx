import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative w-full">
        <div className="w-full">
          <Image
            src="/images/homeimg1.jpg"
            alt="Hero Image"
            width={1500}
            height={1500}
            className="w-full h-[400px] object-cover brightness-50"
          />
        </div>

        <div className="absolute top-20 lg:top-10 left-10 max-w-md z-10 w-72 lg:w-full">
          <h1 className="text-2xl lg:text-4xl font-semibold text-white leading-tight">
            Kickstart your career with the right opportunities.
          </h1>
          <p className="text-gray-300 mt-2">
            Discover internships and jobs that align with your skills and goals.
            Apply now and grow with top companies.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 mt-4 rounded shadow">
            Get Started
          </button>
        </div>
      </div>

      <section className="py-16  text-center px-6">
        <h2 className="text-2xl font-semibold mb-6 text-black">Why RozGaar?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Whether you're a student looking for your first internship or a
          graduate seeking full-time opportunities, RozGaar connects you with
          verified employers, real-time listings, and personalized
          recommendations — all in one place.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="🎯 Skill-Matched Listings"
            desc="We show you jobs that match your profile."
          />
          <FeatureCard
            title="🕒 Easy Apply"
            desc="Apply in minutes with a single click."
          />
          <FeatureCard
            title="✅ Verified Companies"
            desc="Only real and trusted companies."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-2 bg-white shadow-lg rounded-lg p-6 text-left">
      <h1 className="text-center text-black font-bold">{title}</h1>
      <p className="text-center text-gray-800">{desc}</p>
    </div>
  );
}
