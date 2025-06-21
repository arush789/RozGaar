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
            title="Skill-Matched Listings"
            desc="We show you jobs that match your profile."
          />
          <FeatureCard
            title="Easy Apply"
            desc="Apply in minutes with a single click."
          />
          <FeatureCard
            title="Verified Companies"
            desc="Only real and trusted companies."
          />
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">
          How it works
        </h2>
        <div className="max-w-2xl mx-auto space-y-8 px-8 lg:px-0">
          <HowItWorks
            step={1}
            title="Create Your Profile"
            desc="Sign up and create a profile that highlights your skills and interests."
          />
          <HowItWorks
            step={2}
            title="Browse Opportunities"
            desc="Explore internships and jobs that match your profile."
          />
          <HowItWorks
            step={3}
            title="Apply with Ease"
            desc="Use our easy apply feature to submit your applications."
          />
        </div>
      </section>
      <section className="py-16 bg-nav">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center">
            Popular Jobs
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <PopularJobCard
              title="Frontend Developer Intern"
              company="TechNova"
              location="Bangalore, India"
              type="Internship"
              duration="3 Months"
              stipend="₹10,000/month"
              posted="2 days ago"
            />
            <PopularJobCard
              title="Content Writing Intern"
              company="EduVerse"
              location="Remote"
              type="Internship"
              duration="2 Months"
              stipend="₹5,000/month"
              posted="1 day ago"
            />
            <PopularJobCard
              title="Digital Marketing Intern"
              company="GrowthHackers"
              location="Delhi, India"
              type="Internship"
              duration="6 Months"
              stipend="₹8,000/month"
              posted="3 days ago"
            />
          </div>
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

function PopularJobCard({
  title,
  company,
  location,
  type,
  duration,
  stipend,
  posted,
}: {
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  stipend: string;
  posted: string;
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{company}</p>
      <p className="text-gray-500">{location}</p>
      <div className="mt-4 flex flex-col gap-2">
        <span className="text-sm text-gray-500">Type: {type}</span>
        <span className="text-sm text-gray-500">Duration: {duration}</span>
        <span className="text-sm text-gray-500">Stipend: {stipend}</span>
        <span className="text-sm text-gray-500">Posted: {posted}</span>
      </div>
    </div>
  );
}

function HowItWorks({
  step,
  title,
  desc,
}: {
  step: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-2xl font-bold text-blue-600">{step}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
