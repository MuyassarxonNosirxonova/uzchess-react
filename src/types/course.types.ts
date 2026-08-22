export interface Author {
  id: number;
  fullName: string;
}

export interface CourseCategory {
  id: number;
  title: string;
}

export interface Difficulty {
  id: number;
  title: string;
  icon: string;
}

export interface Language {
  id: number;
  title: string;
  code: string;
}

export interface CourseListParams {
  search?: string;
  categoryId?: number;
  authorId?: number;
  difficultyId?: number;
  languageId?: number;
  page?: number;
  size?: number;
}

export interface Course {
  id: number;
  title: string;
  image: string;

  price: string;
  newPrice?: string;

  isPublished: boolean;
  rating?: number | string | null;

  reviewsCount: number;
  sectionsCount: number;
  lessonsCount: number;

  author: {
    id: number;
    fullName: string;
  };

  category: {
    id: number;
    title: string;
  };

  difficulty: {
    id: number;
    title: string;
  };

  language: {
    id: number;
    title: string;
  };
}

// GET /courses/{id} — Course bilan bir xil, farqi: isPurchased maydoni bor.
export interface CourseDetail extends Course {
  isPurchased: boolean;
}

export interface CourseSection {
  id: number;
  title: string;
  order?: number;
  date: string;
}

export interface CourseLesson {
  id: number;
  courseSectionId: number;
  title: string;
  thumbnail?: string;
  order?: number;
  isFree: boolean;
  duration: number | null;
  isCompleted: boolean;
  stoppedAt: number | null;
}

export interface LessonDetail {
  id: number;
  courseId: number;
  courseSectionId: number;
  title: string;
  content?: string;
  thumbnail?: string;
  video: string;
  duration: number | null;
  isFree: boolean;
  isCompleted: boolean;
  stoppedAt: number | null;
}

export interface CourseReview {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    id: number;
    fullName: string;
  };
}