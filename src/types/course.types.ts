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