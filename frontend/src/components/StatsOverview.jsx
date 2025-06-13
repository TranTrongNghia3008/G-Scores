import Card from "./ui/Card";
import { MdBarChart } from "react-icons/md";

const StatsOverview = ({ totalStudents }) => {
    return (
        <Card title={"General Statistics"} icon={<MdBarChart />}>
            <p className="text-lg text-gray-700">Total number of students: <span className="font-semibold">{totalStudents.toLocaleString()}</span></p>
        </Card>
    );
};

export default StatsOverview;
