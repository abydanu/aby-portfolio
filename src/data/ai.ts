import type { PipelineStage } from '../types'

export const pipeline: PipelineStage[] = [
  { id: 'data', label: 'Data', description: 'Understand the raw dataset the model will learn from.', tools: ['Python', 'Pandas'] },
  { id: 'exploration', label: 'Exploration', description: 'Find gaps, imbalance and noise.', tools: ['Matplotlib', 'Seaborn'] },
  { id: 'preprocessing', label: 'Preprocessing', description: 'Shape it into reliable, training-ready input.', tools: ['Pandas', 'Scikit-learn'] },
  { id: 'features', label: 'Feature selection', description: 'Pick the signals that matter for the task.', tools: ['Scikit-learn'] },
  { id: 'model', label: 'Model', description: 'Work with teammates on recognition and detection models.', tools: ['YOLOv8'] },
  { id: 'inference', label: 'Inference', description: 'Serve detections in real time through a Go backend.', tools: ['OpenCV', 'Go', 'WebSocket'] },
]
