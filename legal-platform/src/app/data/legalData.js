import categoriesData from '../../data/categories.json';
import topicsData from '../../data/topics.json';

export const categories = categoriesData.categories;
export const circularInfo = categoriesData.circular_info;
export const topics = topicsData.topics;
export const importantGuidelines = topicsData.important_judicial_notes;
export const metadata = topicsData.metadata;

export default {
  categories,
  circularInfo,
  topics,
  importantGuidelines,
  metadata
};

