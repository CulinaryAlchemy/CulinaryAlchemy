import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import BlenderIcon from '@mui/icons-material/Blender'
import CoffeeIcon from '@mui/icons-material/Coffee'
import CookieIcon from '@mui/icons-material/Cookie'
import EggAltIcon from '@mui/icons-material/EggAlt'
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import IcecreamIcon from '@mui/icons-material/Icecream'
import KitchenIcon from '@mui/icons-material/Kitchen'
import LiquorIcon from '@mui/icons-material/Liquor'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import LocalDrinkIcon from '@mui/icons-material/LocalDrink'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import MicrowaveIcon from '@mui/icons-material/Microwave'
import NightlifeIcon from '@mui/icons-material/Nightlife'
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill'
import RamenDiningIcon from '@mui/icons-material/RamenDining'
import SportsBarIcon from '@mui/icons-material/SportsBar'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import WaterDropIcon from '@mui/icons-material/WaterDrop'

import styles from './background.module.css'

const Background = () => {
  return (
    <div className={styles.background__container}>
      <div className={styles.background}>
        {Array(15).fill(null).map((_, index) => {
          const animationDirectionCalc = index % 2
          const shouldUseLeftAnimation = animationDirectionCalc === 0

          const animationDirection = 'background__icon-container--' + (shouldUseLeftAnimation ? 'left' : 'right')

          const animationTime = String(Math.floor(Math.random() * (401 - 250) + 250)) + 's'

          const animationDelay = '-' + String(Math.floor(Math.random() * (500 - 1) + 1)) + 's'
          return (
            <div
              key={index}
              className={styles['background__icon-container-container']}
              style={{
                // @ts-expect-error compiler shows an error
                '--animation-time': animationTime,
                '--animation-delay': animationDelay
              }}
            >
              <div
                className={[
                  styles['background__icon-container'],
                  styles[animationDirection]
                ].join(' ')}
              >
                <CookieIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <BlenderIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <EggAltIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <CoffeeIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <IcecreamIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalFireDepartmentIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <WaterDropIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <MicrowaveIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <OutdoorGrillIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <ThumbsUpDownIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <NightlifeIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <AccessAlarmIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LunchDiningIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalDrinkIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalCafeIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalBarIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LiquorIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <SportsBarIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalPizzaIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <KitchenIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <FastfoodIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <RamenDiningIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <EmojiFoodBeverageIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
              </div>
              <div
                className={[
                  styles['background__icon-container'],
                  styles[animationDirection]
                ].join(' ')}
              >
                <CookieIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <BlenderIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <EggAltIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <CoffeeIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <IcecreamIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalFireDepartmentIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <WaterDropIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <MicrowaveIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <OutdoorGrillIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <ThumbsUpDownIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <NightlifeIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <AccessAlarmIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LunchDiningIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalDrinkIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalCafeIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalBarIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LiquorIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <SportsBarIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <LocalPizzaIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <KitchenIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <FastfoodIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <RamenDiningIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
                <EmojiFoodBeverageIcon
                  className={styles.background__icon}
                  sx={{
                    fontSize: 'inherit'
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Background
