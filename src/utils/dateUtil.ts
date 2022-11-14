/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

/**
 * 获取两个日期中所有的年份
 * 返回两个时间之间所有的年份
 * 参数示例 （'2021-01-01','2021-01-01'）
 * **/
export const getYearBetween = (start, end) => {
  const result: any = [];
  let min = new Date(start).getFullYear();
  const max = new Date(end).getFullYear();
  while (min <= max) {
    result.push(min);
    min = Number(min) + 1;
  }
  return result;
};

export const dateUtil = dayjs;
