import Card from "./ui/Card";
import { MdEmojiEvents } from "react-icons/md";

const FIELD_LABELS = {
  sbd: "SBD",
  toan: "Toán",
  ngu_van: "Ngữ văn",
  ngoai_ngu: "Ngoại ngữ",
  vat_li: "Vật lí",
  hoa_hoc: "Hóa học",
  sinh_hoc: "Sinh học",
  lich_su: "Lịch sử",
  dia_li: "Địa lí",
  gdcd: "Giáo dục công dân",
  total_score: "Tổng điểm",
};

const TopNational = ({ students }) => {
    return (
        <Card title={"Top 5 Students Nationwide"} icon={<MdEmojiEvents />}>
            <div className="overflow-auto">
                <table className="table-auto w-full text-sm border border-gray-200 rounded-md">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                    <th className="px-3 py-2 border">STT</th>
                    {Object.keys(FIELD_LABELS).map((field) => (
                        <th key={field} className="px-3 py-2 border">{FIELD_LABELS[field]}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                    <tr key={student.sbd} className="hover:bg-gray-50">
                        <td className="px-3 py-2 border text-center font-bold">{index + 1}</td>
                        {Object.keys(FIELD_LABELS).map((field) => (
                        <td key={field} className="px-3 py-2 border text-center">
                            {student[field] !== null ? student[field] : "—"}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Card>
    );
};

export default TopNational;
