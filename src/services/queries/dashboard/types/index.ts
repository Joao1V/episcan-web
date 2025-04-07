interface LineChartDetection {
  date: string;
  total: number;
}

interface LineChartDepartmentDetections {
  dates: string[];
  series: Record<string, number[]>;
}

interface DetectionCountByDepartment {
  monitored_company_department_id: number;
  title: string;
  full_path: string;
  total: number;
}

interface Summary {
  customer_count: number;
  cameras_active_count: number;
  cameras_inactive_count: number;
  monitored_company_department_count: number;
  detection_count_in_period: number;
  detection_count_in_previous_period: number;
  verification_count_in_period: number;
  average_daily_detection_in_period: number;
  line_chart_detections_in_period: LineChartDetection[];
  line_chart_department_detections_in_period: LineChartDepartmentDetections;
  detection_count_by_department: DetectionCountByDepartment[];
}

export type { Summary };