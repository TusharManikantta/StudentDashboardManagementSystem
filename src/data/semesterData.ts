interface Student {
  name: string;
  rank: number;
  cgpa: number;
}

interface SemesterSubject {
  name: string;
  totalClasses: number;
  attendedClasses: number;
  grade: string;
  behavior: string;
  marks: number;
}

interface SemesterData {
  overallPerformance: number;
  attendance: {
    percentage: number;
    attended: number;
    total: number;
  };
  classRank: number;
  behaviorScore: string;
  subjects: SemesterSubject[];
  performanceTrends: Array<{ name: string; score: number }>;
  topStudents: Student[];
}

export const semesterData: Record<number, SemesterData> = {
  1: {
    overallPerformance: 85,
    attendance: { percentage: 92, attended: 230, total: 250 },
    classRank: 5,
    behaviorScore: 'A+',
    subjects: [
      { name: 'Engineering Mathematics I', totalClasses: 45, attendedClasses: 42, grade: 'A', behavior: 'Excellent', marks: 92 },
      { name: 'Physics', totalClasses: 40, attendedClasses: 38, grade: 'A-', behavior: 'Good', marks: 85 },
      { name: 'Basic Electronics', totalClasses: 42, attendedClasses: 39, grade: 'B+', behavior: 'Very Good', marks: 78 },
      { name: 'Programming in C', totalClasses: 45, attendedClasses: 41, grade: 'A', behavior: 'Excellent', marks: 90 },
      { name: 'Engineering Drawing', totalClasses: 38, attendedClasses: 35, grade: 'B+', behavior: 'Good', marks: 82 },
      { name: 'English Communication', totalClasses: 40, attendedClasses: 35, grade: 'A', behavior: 'Excellent', marks: 88 }
    ],
    performanceTrends: [
      { name: 'Test 1', score: 85 },
      { name: 'Test 2', score: 78 },
      { name: 'Test 3', score: 92 },
      { name: 'Test 4', score: 88 },
      { name: 'Test 5', score: 95 }
    ],
    topStudents: [
      { name: 'Jagruth', rank: 1, cgpa: 9.8 },
      { name: 'Tushar', rank: 2, cgpa: 9.6 },
      { name: 'Suhaas', rank: 3, cgpa: 9.5 },
      { name: 'Somasekhar', rank: 4, cgpa: 9.4 },
      { name: 'Avinash', rank: 5, cgpa: 9.3 }
    ]
  },
  2: {
    overallPerformance: 88,
    attendance: { percentage: 94, attended: 235, total: 250 },
    classRank: 3,
    behaviorScore: 'A+',
    subjects: [
      { name: 'Engineering Mathematics II', totalClasses: 45, attendedClasses: 43, grade: 'A+', behavior: 'Excellent', marks: 95 },
      { name: 'Data Structures', totalClasses: 42, attendedClasses: 40, grade: 'A', behavior: 'Very Good', marks: 88 },
      { name: 'Digital Electronics', totalClasses: 40, attendedClasses: 37, grade: 'A-', behavior: 'Good', marks: 84 },
      { name: 'Object Oriented Programming', totalClasses: 45, attendedClasses: 42, grade: 'A+', behavior: 'Excellent', marks: 92 },
      { name: 'Computer Organization', totalClasses: 38, attendedClasses: 36, grade: 'A', behavior: 'Very Good', marks: 87 },
      { name: 'Professional Ethics', totalClasses: 40, attendedClasses: 37, grade: 'A-', behavior: 'Good', marks: 85 }
    ],
    performanceTrends: [
      { name: 'Test 1', score: 88 },
      { name: 'Test 2', score: 92 },
      { name: 'Test 3', score: 85 },
      { name: 'Test 4', score: 90 },
      { name: 'Test 5', score: 94 }
    ],
    topStudents: [
      { name: 'Teja', rank: 1, cgpa: 9.9 },
      { name: 'Suhaas', rank: 2, cgpa: 9.7 },
      { name: 'Tushar', rank: 3, cgpa: 9.6 },
      { name: 'Jagruth', rank: 4, cgpa: 9.5 },
      { name: 'Avinash', rank: 5, cgpa: 9.4 }
    ]
  }
  // Add data for semesters 3-8 similarly
};

export const getSemesterData = (semester: number): SemesterData => {
  return semesterData[semester] || semesterData[1];
};