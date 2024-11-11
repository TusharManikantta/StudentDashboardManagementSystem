import React from 'react';
import { BarChart, PieChart, Activity, Users, Calendar, GraduationCap, Trophy, LogOut } from 'lucide-react';
import PerformanceChart from './PerformanceChart';
import AttendanceChart from './AttendanceChart';
import GradesTable from './GradesTable';
import TopStudents from './TopStudents';
import { User } from '../types';
import { getUserPerformance, getTopStudents } from '../data/userData';

interface DashboardProps {
  user: User;
  currentSemester: number;
  onSemesterChange: (semester: number) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, currentSemester, onSemesterChange, onLogout }: DashboardProps) {
  const performance = getUserPerformance(user.id, currentSemester);
  const topStudents = getTopStudents(currentSemester);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LearnHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={currentSemester}
                onChange={(e) => onSemesterChange(Number(e.target.value))}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
                <button
                  onClick={onLogout}
                  className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <Activity className="h-12 w-12 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overall Performance</p>
                <p className="text-2xl font-semibold text-gray-900">{performance.overallPerformance}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <Calendar className="h-12 w-12 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-2xl font-semibold text-gray-900">{performance.attendance.percentage}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <Trophy className="h-12 w-12 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Class Rank</p>
                <p className="text-2xl font-semibold text-gray-900">#{performance.classRank}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-12 w-12 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Behavior Score</p>
                <p className="text-2xl font-semibold text-gray-900">{performance.behaviorScore}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                <PerformanceChart data={performance.performanceTrends} />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
                <GradesTable subjects={performance.subjects} />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
              <AttendanceChart attendance={performance.attendance} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
              <TopStudents students={topStudents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}