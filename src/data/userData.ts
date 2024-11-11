import { User } from '../types';

interface UserPerformance {
  overallPerformance: number;
  attendance: {
    percentage: number;
    attended: number;
    total: number;
  };
  classRank: number;
  behaviorScore: string;
  subjects: {
    name: string;
    totalClasses: number;
    attendedClasses: number;
    grade: string;
    behavior: string;
    marks: number;
  }[];
  performanceTrends: Array<{ name: string; score: number }>;
}

const users: User[] = [
  { id: 'USR001', name: 'Jagruth Karpuram', email: 'jagruth@example.com', branch: 'CSE', rollNumber: 'CSE001' },
  { id: 'USR002', name: 'Sanket Kumar', email: 'sanketh@example.com', branch: 'CSE', rollNumber: 'CSE002' },
  { id: 'USR003', name: 'Somasekhar Udatha', email: 'soma@example.com', branch: 'CSE', rollNumber: 'CSE003' },
  { id: 'USR004', name: 'Avinash Reddy', email: 'avinash@example.com', branch: 'CSE', rollNumber: 'CSE004' },
  { id: 'USR005', name: 'Sai Teja', email: 'teja@example.com', branch: 'CSE', rollNumber: 'CSE005' },
  { id: 'USR006', name: 'Veeramachaneni Suhaas', email: 'Suhaas@example.com', branch: 'CSE', rollNumber: 'CSE006' },
  { id: 'USR007', name: 'Akshay Mushari', email: 'akshay@example.com', branch: 'CSE', rollNumber: 'CSE007' },
  { id: 'USR008', name: 'Yakshith Naidu', email: 'yakshith@example.com', branch: 'CSE', rollNumber: 'CSE008' },
];

// Generate random performance data for a user
const generatePerformanceData = (userId: string, semester: number): UserPerformance => {
  const baseAttendance = Math.floor(Math.random() * 20) + 80; // 80-100%
  const totalClasses = 250;
  const attendedClasses = Math.floor((totalClasses * baseAttendance) / 100);

  const subjects = getSemesterSubjects(semester).map(subject => ({
    name: subject,
    totalClasses: Math.floor(totalClasses / 6),
    attendedClasses: Math.floor((totalClasses / 6) * (baseAttendance / 100)),
    grade: getRandomGrade(),
    behavior: getRandomBehavior(),
    marks: Math.floor(Math.random() * 20) + 80 // 80-100
  }));

  const performanceTrends = Array(5).fill(0).map((_, i) => ({
    name: `Test ${i + 1}`,
    score: Math.floor(Math.random() * 20) + 80 // 80-100
  }));

  return {
    overallPerformance: Math.floor(subjects.reduce((acc, subj) => acc + subj.marks, 0) / subjects.length),
    attendance: {
      percentage: baseAttendance,
      attended: attendedClasses,
      total: totalClasses
    },
    classRank: 0, // Will be calculated later
    behaviorScore: getRandomBehavior(),
    subjects,
    performanceTrends
  };
};

const getRandomGrade = () => {
  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-'];
  return grades[Math.floor(Math.random() * 3)]; // Bias towards better grades
};

const getRandomBehavior = () => {
  const behaviors = ['Excellent', 'Very Good', 'Good'];
  return behaviors[Math.floor(Math.random() * behaviors.length)];
};

const getSemesterSubjects = (semester: number): string[] => {
  const subjects = {
    1: [
      'Engineering Mathematics I',
      'Physics',
      'Basic Electronics',
      'Programming in C',
      'Engineering Drawing',
      'English Communication'
    ],
    2: [
      'Engineering Mathematics II',
      'Data Structures',
      'Digital Electronics',
      'Object Oriented Programming',
      'Computer Organization',
      'Professional Ethics'
    ],
    3: [
      'Probability and Statistics',
      'Database Management Systems',
      'Computer Networks',
      'Operating Systems',
      'Software Engineering',
      'Web Technologies'
    ],
    4: [
      'Design and Analysis of Algorithms',
      'Artificial Intelligence',
      'Computer Architecture',
      'Theory of Computation',
      'Cloud Computing',
      'Mobile Application Development'
    ],
    5: [
      'Machine Learning',
      'Compiler Design',
      'Information Security',
      'Big Data Analytics',
      'Internet of Things',
      'Professional Elective I'
    ],
    6: [
      'Deep Learning',
      'Distributed Systems',
      'Natural Language Processing',
      'Blockchain Technology',
      'Professional Elective II',
      'Open Elective'
    ],
    7: [
      'Data Mining',
      'Computer Vision',
      'Professional Elective III',
      'Professional Elective IV',
      'Project Phase I',
      'Industry Internship'
    ],
    8: [
      'Professional Elective V',
      'Professional Elective VI',
      'Project Phase II',
      'Technical Seminar',
      'Comprehensive Viva',
      'Industry Readiness'
    ]
  };
  return subjects[semester as keyof typeof subjects] || subjects[1];
};

// Performance data cache
const userPerformanceCache: Record<string, Record<number, UserPerformance>> = {};

export const addNewUser = (user: User): void => {
  users.push(user);
  // Generate performance data for all semesters
  for (let semester = 1; semester <= 8; semester++) {
    getUserPerformance(user.id, semester);
  }
};

export const getUserPerformance = (userId: string, semester: number): UserPerformance => {
  if (!userPerformanceCache[userId]) {
    userPerformanceCache[userId] = {};
  }

  if (!userPerformanceCache[userId][semester]) {
    userPerformanceCache[userId][semester] = generatePerformanceData(userId, semester);
  }

  // Get all performances for this semester to calculate ranks
  const allPerformances = users.map(user => {
    if (!userPerformanceCache[user.id]?.[semester]) {
      userPerformanceCache[user.id] = {
        ...userPerformanceCache[user.id],
        [semester]: generatePerformanceData(user.id, semester)
      };
    }
    return {
      userId: user.id,
      performance: userPerformanceCache[user.id][semester].overallPerformance
    };
  });

  // Sort by performance and update ranks
  allPerformances.sort((a, b) => b.performance - a.performance);
  allPerformances.forEach((perf, index) => {
    userPerformanceCache[perf.userId][semester].classRank = index + 1;
  });

  return userPerformanceCache[userId][semester];
};

export const getTopStudents = (semester: number): Array<{ name: string; rank: number; cgpa: number }> => {
  const topPerformers = users
    .map(user => ({
      name: user.name,
      performance: getUserPerformance(user.id, semester),
    }))
    .sort((a, b) => b.performance.overallPerformance - a.performance.overallPerformance)
    .slice(0, 5)
    .map((student, index) => ({
      name: student.name,
      rank: index + 1,
      cgpa: (student.performance.overallPerformance / 10).toFixed(1)
    }));

  return topPerformers;
};