import React from "react";
import ecoImage from "../images/landing_page_image.png";

const CollegeSyncFinal = () => {
  return (
    <div className="min-h-screen w-full bg-white font-sans antialiased text-[#444]">

        <nav className=" sticky top-0 z-50 w-full  bg-white  px-[5%] h-16  border-b border-gray-100  shadow-sm">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#387ed1] text-sm font-bold text-white shadow-sm">
              CS
            </div>
            <span className="text-2xl font-semibold tracking-tight text-gray-800">
              College Sync
            </span>
          </div>

          <div className="flex items-center gap-12 text-[15px]">
            <a href="#about" className="font-medium text-gray-500 hover:text-[#387ed1]">
              About
            </a>
            <button className="rounded-[3px] bg-[#387ed1] px-10 py-2.5 font-medium text-white hover:bg-[#414141]">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="relative w-full overflow-hidden border-b border-gray-50 px-[5%] pb-40 pt-32">
        <div className="absolute inset-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpG8Tn3Ua3awGChVNo7UbsbU_ZA9TRZOBI1Q&s"
            loading="lazy"
            decoding="async"
            alt="Campus Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/85"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="mb-8 max-w-5xl text-5xl font-serif font-medium leading-tight md:text-6xl">
            The backbone of digital campus operations.
          </h1>

          <p className="mb-12 max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl">
            Centralize communications, automate approvals, and manage roles
            with a system designed for institutional scale.
          </p>

          <button className="rounded-[3px] bg-[#387ed1] px-14 py-4 text-xl font-medium text-white hover:bg-[#414141]">
            Get Started
          </button>
        </div>
      </main>

    <section className="w-full bg-white px-[5%] py-20 border-t border-gray-100">
    <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <div className="space-y-8">
        <h2 className="text-4xl font-serif font-medium text-gray-800">
            The College Sync ecosystem
        </h2>

        <p className="text-lg leading-relaxed text-gray-500">
            College Sync is not just a single application, but a complete
            digital campus ecosystem. It connects academics, communication,
            administration, and student life into one unified platform.
        </p>

        <p className="text-lg leading-relaxed text-gray-500">
            From timetables and assignments to approvals, clubs, and audits,
            every module works together seamlessly — designed around
            institutional hierarchy and real academic workflows.
        </p>

        <p className="text-lg leading-relaxed text-gray-500">
            Each role — Student, Faculty, HOD, Club President, and Admin —
            gets exactly what they need, ensuring clarity, accountability,
            and trust across the campus.
        </p>
        </div>

        <div className="flex justify-center">
        <img
            src={ecoImage}
            alt="College Sync ecosystem"
            className="w-full max-w-xl object-contain"
            loading="lazy"
            decoding="async"
        />
        </div>

    </div>
    </section>
      <section className="w-full bg-white px-[5%] py-20 border-t border-gray-100">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-serif font-medium text-gray-800">
              A unified campus dashboard
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-500">
              Assignments, approvals, notifications, and analytics —
              everything in one place.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <span className="text-sm font-medium text-gray-600">
                College Sync • Dashboard
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
              <DashboardCard
                title="Pending Approvals"
                value="12"
                subtitle="Clubs • Events • Requests"
              />
              <DashboardCard
                title="Active Classes"
                value="24"
                subtitle="Lectures & Labs"
              />
              <DashboardCard
                title="Notifications"
                value="8"
                subtitle="Unread updates"
              />
            </div>

            <div className="border-t border-gray-200 bg-white px-6 py-5">
              <p className="mb-3 text-sm font-medium text-gray-600">
                Recent Activity
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• New event approval requested by Coding Club</li>
                <li>• Assignment uploaded for SY IT – DBMS</li>
                <li>• Timetable updated by HOD – CSE</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};


const Feature = ({ title, description }) => (
  <div className="space-y-4">
    <h3 className="text-2xl font-serif font-medium text-gray-800 underline">
      {title}
    </h3>
    <p className="text-lg leading-relaxed text-gray-500">
      {description}
    </p>
  </div>
);

const DashboardCard = ({ title, value, subtitle }) => (
  <div className="rounded-md border border-gray-200 bg-white p-6">
    <p className="mb-2 text-sm font-medium text-gray-500">{title}</p>
    <p className="mb-1 text-4xl font-semibold text-gray-800">{value}</p>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </div>
);

export default CollegeSyncFinal;
