import React from 'react'
import DashboardCard from '../../components/DashboardCard'
import ActivityRow from '../../components/ActivityRow'

const Dashboard = () => {
    console.log("rendering Dashboard");
  return (
    <div>
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">Student Dashboard</h1>
          <p className="mt-2 text-zinc-400">Welcome back! Here's what's happening today.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <DashboardCard
            title="Attendance"
            value="85%"
            subtitle="Last updated today"
          />
          <DashboardCard
            title="Assignments"
            value="3 Pending"
            subtitle="Due this week"
          />
          <DashboardCard
            title="CGPA"
            value="8.2"
            subtitle="Semester 5"
          />
          <DashboardCard
            title="Events"
            value="2 Upcoming"
            subtitle="Tech Fest & Workshop"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <div className="rounded-xl border border-zinc-800/50 bg-[#18181b]/30 p-4 space-y-2">
              <ActivityRow text="Data Structures Assignment Uploaded" time="2h ago" />
              <ActivityRow text="Workshop on ReactJS scheduled" time="5h ago" />
              <ActivityRow text="Timetable updated for Friday" time="1d ago" />
              <ActivityRow text="Library book 'Clean Code' due tomorrow" time="1d ago" />
              <ActivityRow text="New announcement from Principal" time="2d ago" />
            </div>
          </div>

          {/* Quick Actions / Schedule or other widget */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Today's Schedule</h2>
            <div className="rounded-xl border border-zinc-800/50 bg-[#18181b]/30 p-6">
              <div className="space-y-4">
                <div className="flex gap-4 items-start pb-4 border-b border-zinc-800/50 last:border-0 last:pb-0">
                  <div className="text-sm font-medium text-zinc-400 w-16">09:00 AM</div>
                  <div>
                    <h4 className="font-semibold text-zinc-200">Database Management</h4>
                    <p className="text-xs text-zinc-500">Room 302 • Prof. Smith</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start pb-4 border-b border-zinc-800/50 last:border-0 last:pb-0">
                  <div className="text-sm font-medium text-zinc-400 w-16">11:00 AM</div>
                  <div>
                    <h4 className="font-semibold text-zinc-200">Operating Systems</h4>
                    <p className="text-xs text-zinc-500">Lab 2 • Prof. Johnson</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start pb-4 border-b border-zinc-800/50 last:border-0 last:pb-0">
                  <div className="text-sm font-medium text-zinc-400 w-16">02:00 PM</div>
                  <div>
                    <h4 className="font-semibold text-zinc-200">Web Development</h4>
                    <p className="text-xs text-zinc-500">Lab 1 • Prof. Davis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Dashboard