import { ComponentType, lazy, Suspense } from 'react';
import Stat from '@/components/Stat';
import useActivities from '@/hooks/useActivities';
import { formatPace } from '@/utils/utils';
import styles from './style.module.scss';
import useHover from '@/hooks/useHover';
import { yearStats } from '@assets/index'

const YearStat = ({ year, onClick }: { year: string, onClick: (_year: string) => void }) => {
  let { activities: runs, years } = useActivities();
  // for hover
  const [hovered, eventHandlers] = useHover();
  // lazy Component
  const YearSVG = lazy(() =>
    yearStats[`./year_${year}.svg`]()
      .then((res) => ({ default: res as ComponentType<any> }))
      .catch((err) => {
        console.error(err);
        return { default: () => <div>Failed to load SVG</div> };
      })
  );

  if (years.includes(year)) {
    runs = runs.filter((run) => run.start_date_local.slice(0, 4) === year);
  }
  let sumDistance = 0;
  let streak = 0;
  let pace = 0; // eslint-disable-line no-unused-vars
  let paceNullCount = 0; // eslint-disable-line no-unused-vars
  let heartRate = 0;
  let heartRateNullCount = 0;
  let totalMetersAvail = 0;
  let totalSecondsAvail = 0;
  runs.forEach((run) => {
    sumDistance += run.distance || 0;
    if (run.average_speed) {
      pace += run.average_speed;
      totalMetersAvail += run.distance || 0;
      totalSecondsAvail += (run.distance || 0) / run.average_speed;
    } else {
      paceNullCount++;
    }
    if (run.average_heartrate) {
      heartRate += run.average_heartrate;
    } else {
      heartRateNullCount++;
    }
    if (run.streak) {
      streak = Math.max(streak, run.streak);
    }
  });
  sumDistance = parseFloat((sumDistance / 1000.0).toFixed(1));
  const avgPace = formatPace(totalMetersAvail / totalSecondsAvail);
  const hasHeartRate = !(heartRate === 0);
  const avgHeartRate = (heartRate / (runs.length - heartRateNullCount)).toFixed(
    0
  );
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(year)}
      {...eventHandlers}
    >
      <section>
        <Stat value={year} description=" 跑步旅程" />
        <Stat value={runs.length} description=" 次数" />
        <Stat value={sumDistance} description=" 公里" />
        <Stat value={avgPace} description=" 平均配速" />
        <Stat value={streak} description=" 连续天数" />
        {hasHeartRate && (
          <Stat value={avgHeartRate} description=" 平均心率" />
        )}
      </section>
      {year !== "Total" && hovered && (
        <Suspense fallback="loading...">
          <YearSVG className={styles.yearSVG} />
        </Suspense>
      )}
      <hr color="red" />
    </div>
  );
};

export default YearStat;
