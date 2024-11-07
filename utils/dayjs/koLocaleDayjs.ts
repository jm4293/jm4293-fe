import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

const koLocaleDayjs = (date: any) => {
  // date를 UTC로 처리한 후 +9시간을 더한 값을 서울 시간으로 변환
  return dayjs(date).utc(true).add(9, 'hour').format('YY-MM-DD HH:mm');
};

export default koLocaleDayjs;
