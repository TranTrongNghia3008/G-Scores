import { FiList } from 'react-icons/fi';
import Card from './ui/Card';

const FIELD_LABELS = {
  sbd: 'Số báo danh',
  toan: 'Toán',
  ngu_van: 'Ngữ văn',
  ngoai_ngu: 'Ngoại ngữ',
  ma_ngoai_ngu: 'Mã ngoại ngữ',
  vat_li: 'Vật lí',
  hoa_hoc: 'Hóa học',
  sinh_hoc: 'Sinh học',
  lich_su: 'Lịch sử',
  dia_li: 'Địa lí',
  gdcd: 'Giáo dục công dân',
  total_score: 'Tổng điểm',
};

const DetailedScores = ({ scoreData }) => {
  return (
    <Card title="Score Details" icon={<FiList />}>
      {scoreData ? (
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white">
          <table className="w-full">
            <tbody>
              {Object.entries(scoreData).map(([key, value]) => {
                const label = FIELD_LABELS[key] || key;
                return (
                  <tr
                    key={key}
                    className="hover:bg-gray-50 transition-colors border-b last:border-none"
                  >
                    <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                      {label}
                    </td>
                    <td className="px-6 py-3 text-sm text-right text-gray-600">
                      {value !== null ? value : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-600 text-center">
          Please enter a registration number to view score details.
        </div>
      )}
    </Card>
  );
};

export default DetailedScores;
