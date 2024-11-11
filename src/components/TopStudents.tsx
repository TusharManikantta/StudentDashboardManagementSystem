import React from 'react';
import { Trophy } from 'lucide-react';

interface Student {
  name: string;
  rank: number;
  cgpa: number;
}

interface TopStudentsProps {
  students: Student[];
}

export default function TopStudents({ students }: TopStudentsProps) {
  return (
    <div className="space-y-4">
      {students.map((student, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === 0 ? 'bg-yellow-400' :
              index === 1 ? 'bg-gray-300' :
              index === 2 ? 'bg-amber-600' :
              'bg-blue-600'
            } text-white`}>
              <Trophy size={16} />
            </div>
            <div>
              <p className="font-medium text-gray-900">{student.name}</p>
              <p className="text-sm text-gray-500">CGPA: {student.cgpa}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-600">#{student.rank}</span>
        </div>
      ))}
    </div>
  );
}