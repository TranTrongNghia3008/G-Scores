import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi"; 
import { MdGroups } from "react-icons/md";
import { fetchTopStudentsByGroup } from "./services/scoreService";
import Card from "./ui/Card";

const GROUPS = {
  A: ["toan", "vat_li", "hoa_hoc"],
  A1: ["toan", "vat_li", "ngoai_ngu"],
  B: ["toan", "hoa_hoc", "sinh_hoc"],
  C: ["ngu_van", "lich_su", "dia_li"],
  D01: ["toan", "ngu_van", "ngoai_ngu"],
  D02: ["toan", "ngu_van", "ngoai_ngu"],
  D03: ["toan", "ngu_van", "ngoai_ngu"],
  D04: ["toan", "ngu_van", "ngoai_ngu"],
  D05: ["toan", "ngu_van", "ngoai_ngu"],
  D06: ["toan", "ngu_van", "ngoai_ngu"],
  D07: ["toan", "hoa_hoc", "ngoai_ngu"],
};

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
  ma_ngoai_ngu: "Mã ngoại ngữ",
  total_score: "Tổng điểm",
};

const TopStudentsByGroup = () => {
  const [group, setGroup] = useState("A");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const subjectsInGroup = GROUPS[group] || [];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchTopStudentsByGroup(group);
        setStudents(res);
      } catch (err) {
        console.error("Error fetching top students:", err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [group]);

  return (
    <Card title={`Top 10 Students in Group ${group}`} icon={<MdGroups />}>
      <div className="mb-4">
        <label className="font-medium mr-2">Select group:</label>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md"
        >
          {Object.keys(GROUPS).map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-80 text-gray-600">
            <FiLoader className="animate-spin text-2xl mr-2" />
            <span>Loading chart...</span>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto w-full text-sm border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-3 py-2 border">STT</th>
                {Object.keys(FIELD_LABELS).map((field) => (
                  <th key={field} className="px-3 py-2 border">
                    {FIELD_LABELS[field]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.sbd} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border text-center font-bold">{index + 1}</td>
                  {Object.keys(FIELD_LABELS).map((field) => (
                    <td
                      key={field}
                      className={`px-3 py-2 border text-center ${
                        subjectsInGroup.includes(field) ? "bg-yellow-100 font-semibold" : ""
                      }`}
                    >
                      {student[field] !== null ? student[field] : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default TopStudentsByGroup;
