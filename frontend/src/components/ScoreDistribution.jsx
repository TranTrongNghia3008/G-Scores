import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { FiLoader } from "react-icons/fi"; 
import { MdStackedLineChart } from "react-icons/md";
import Card from "./ui/Card";
import { fetchScoreDistributionBySubject } from "./services/scoreService";

const FOREIGN_LANGUAGES = {
  N1: "Ngoại ngữ (Tiếng Anh)",
  N2: "Ngoại ngữ (Tiếng Nga)",
  N3: "Ngoại ngữ (Tiếng Pháp)",
  N4: "Ngoại ngữ (Tiếng Trung)",
  N5: "Ngoại ngữ (Tiếng Đức)",
  N6: "Ngoại ngữ (Tiếng Nhật)",
  N7: "Ngoại ngữ (Tiếng Hàn)",
};

const SUBJECT_LABELS = {
  toan: "Toán",
  ngu_van: "Ngữ văn",
  vat_li: "Vật lí",
  hoa_hoc: "Hóa học",
  sinh_hoc: "Sinh học",
  lich_su: "Lịch sử",
  dia_li: "Địa lí",
  gdcd: "Giáo dục công dân",
};

const SUBJECT_OPTIONS = [
  ...Object.entries(SUBJECT_LABELS).map(([key, label]) => ({
    value: key,
    label
  })),
  ...Object.entries(FOREIGN_LANGUAGES).map(([code, label]) => ({
    value: `ngoai_ngu_${code}`,
    label
  })),
];


const ScoreDistribution = () => {
    const [selectedSubject, setSelectedSubject] = useState("toan");
    const [distribution, setDistribution] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = async (subject) => {
        setLoading(true);
        try {
        const res = await fetchScoreDistributionBySubject(subject);
        const data = Object.entries(res)
            .map(([score, count]) => ({
            score: parseFloat(score),
            count
            }))
            .sort((a, b) => a.score - b.score);
        setDistribution(data);
        } catch (err) {
        console.error("Error loading distribution:", err);
        setDistribution([]);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadData(selectedSubject);
    }, [selectedSubject]);

    const isForeignLanguage = selectedSubject.startsWith("ngoai_ngu_");
    const langCode = isForeignLanguage ? selectedSubject.split("_").pop() : null;
    const subjectLabel = isForeignLanguage
    ? FOREIGN_LANGUAGES[langCode] || selectedSubject
    : SUBJECT_LABELS[selectedSubject] || selectedSubject;

    return (
        <Card title={`Score Distribution for ${subjectLabel}`} icon={<MdStackedLineChart />}>
            <div className="mb-4">
                <label className="mr-2 font-medium">Select subject:</label>
                <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border px-3 py-2 rounded-md"
                >
                {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-80 text-gray-600">
                    <FiLoader className="animate-spin text-2xl mr-2" />
                    <span>Loading chart...</span>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                <BarChart data={distribution}>
                    <XAxis dataKey="score" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#60a5fa" />
                </BarChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
};

export default ScoreDistribution;
