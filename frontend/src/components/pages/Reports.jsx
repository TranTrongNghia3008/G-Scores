import MainLayout from "../layouts/MainLayout";
import ScoreReportChart from "../ScoreReportChart";
import TopStudentsByGroup from "../TopStudentsByGroup";

const Reports = () => {
  return (
    <MainLayout>
        <ScoreReportChart />
        <TopStudentsByGroup />
    </MainLayout>
  );
};

export default Reports;