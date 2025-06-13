import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi"; 
import { fetchStats, fetchTopNational } from "../services/scoreService";
import MainLayout from "../layouts/MainLayout";
import StatsOverview from "../StatsOverview";
import TopNational from "../TopNational";
import ScoreDistribution from "../ScoreDistribution";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);


  return (
    <MainLayout>
        {loading ? (
            <div className="flex justify-center items-center h-80 text-gray-600">
                <FiLoader className="animate-spin text-2xl mr-2" />
                <span>Loading dashboard...</span>
            </div>
        ) : (
            <>
                <StatsOverview totalStudents={totalStudents} />
                <TopNational students={topStudents} />
                <ScoreDistribution />
            </>
        )}
    </MainLayout>
  );
};

export default Dashboard;
