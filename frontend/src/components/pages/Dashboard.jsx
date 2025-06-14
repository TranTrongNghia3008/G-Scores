import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi"; 
import { fetchStats, fetchTopNational } from "../services/scoreService";
import MainLayout from "../layouts/MainLayout";
import StatsOverview from "../StatsOverview";
import TopNational from "../TopNational";
import ScoreDistribution from "../ScoreDistribution";
import CSVUploader from "../CSVUploader";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, topRes] = await Promise.all([
          fetchStats(),
          fetchTopNational(),
        ]);
        setTotalStudents(statsRes.total_students || 0);
        setTopStudents(topRes || []);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [reloadKey]);

  const handleUploadSuccess = () => {
    setReloadKey(prev => prev + 1); // mỗi lần tăng key => force reload các component con
  };

  return (
    <MainLayout>
        {loading ? (
            <div className="flex justify-center items-center h-80 text-gray-600">
                <FiLoader className="animate-spin text-2xl mr-2" />
                <span>Loading dashboard...</span>
            </div>
        ) : (
            <>
                <CSVUploader onUploadSuccess={handleUploadSuccess} />
                <StatsOverview totalStudents={totalStudents} />
                <TopNational students={topStudents} />
                <ScoreDistribution reloadKey={reloadKey} />
            </>
        )}
    </MainLayout>
  );
};

export default Dashboard;
