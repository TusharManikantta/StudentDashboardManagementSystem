import React from 'react';

interface Subject {
  name: string;
  totalClasses: number;
  attendedClasses: number;
  grade: string;
  behavior: string;
  marks: number;
}

interface GradesTableProps {
  subjects: Subject[];
}

export default function GradesTable({ subjects }: GradesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attendance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Behavior
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Marks
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {Math.round((subject.attendedClasses / subject.totalClasses) * 100)}%
                <span className="text-xs text-gray-400 ml-1">
                  ({subject.attendedClasses}/{subject.totalClasses})
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subject.grade}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subject.behavior}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subject.marks}/100
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}