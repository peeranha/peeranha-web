import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const BoostWallet: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="boost-wallet"
    fill="curentColor"
    viewBox="0 0 50 50"
    size={[50, 50]}
  >
    <g strokeWidth="1">
      <g transform="translate(-980.000000, -13.000000)" fill="#FC6655">
        <g transform="translate(1005.646447, 37.853553) scale(-1, 1) rotate(-45.000000) translate(-1005.646447, -37.853553) translate(980.646447, 12.853553)">
          <path d="M22.2394307,48.1690836 C21.7559329,47.7481071 21.2078298,47.2708615 20.8327022,47.196878 C20.4200619,47.1103902 19.7469162,47.3427609 19.0904429,47.5626274 C18.0650942,47.9054523 16.9042827,48.2951682 15.8278749,47.8470991 C14.7306267,47.3917359 14.1814816,46.2840675 13.6958997,45.3066517 C13.4072599,44.7262459 13.0800653,44.0666466 12.7518286,43.8467801 C12.4173399,43.6227456 11.6775049,43.5706445 11.0251997,43.5247956 C9.94253975,43.4487281 8.7150389,43.3632824 7.88246405,42.5307075 C7.04988919,41.6981326 6.96444346,40.4716738 6.88941794,39.3900559 C6.84356901,38.7377507 6.79146796,37.9979157 6.5663914,37.6603009 C6.34652495,37.3331063 5.68900964,37.0069537 5.10756187,36.7172718 C4.12910406,36.23169 3.02143563,35.6825449 2.56607242,34.5842546 C2.12008739,33.5078468 2.50876126,32.3470353 2.8515862,31.3227286 C3.07145265,30.6672973 3.29861325,29.9889416 3.2173356,29.5815113 C3.1433521,29.2063837 2.66714846,28.6582806 2.24617194,28.1747829 C1.52405132,27.3474181 0.707106781,26.4095991 0.707106781,25.2071068 C0.707106781,24.0056565 1.52405132,23.0678375 2.24617194,22.2394307 C2.66610644,21.7559329 3.1433521,21.2078298 3.2173356,20.8327022 C3.29965527,20.425272 3.07145265,19.7469162 2.8515862,19.0904429 C2.50876126,18.0661362 2.12112941,16.9053247 2.56711444,15.8278749 C3.02247766,14.7316687 4.12910406,14.1814816 5.10756187,13.6969418 C5.68900964,13.4083019 6.34652495,13.0811073 6.56743342,12.7518286 C6.79146796,12.4162978 6.84356901,11.6775049 6.88941794,11.0251997 C6.96548548,9.94253975 7.05093121,8.7150389 7.88350607,7.88246405 C8.71608092,7.05093121 9.94358177,6.96444346 11.0262417,6.88941794 C11.6785469,6.84356901 12.4173399,6.79146796 12.7539127,6.5663914 C13.0811073,6.34652495 13.4093439,5.68796762 13.6969418,5.10756187 C14.1825236,4.13014608 14.7316687,3.02143563 15.8289169,2.56711444 C16.9042827,2.12112941 18.0671782,2.50876126 19.091485,2.8515862 C19.7479583,3.07145265 20.428398,3.29757122 20.8327022,3.21837762 C21.2078298,3.1433521 21.7559329,2.66610644 22.2394307,2.24512992 C23.0667955,1.52405132 24.0066985,0.707106781 25.2071068,0.707106781 C26.4075151,0.707106781 27.3474181,1.52405132 28.1747829,2.24512992 C28.6582806,2.66610644 29.2063837,3.1433521 29.5815113,3.21837762 C29.9962357,3.29861325 30.6683393,3.07145265 31.3237706,2.8515862 C32.3480773,2.50876126 33.5099309,2.11904537 34.5863387,2.56815646 C35.6835869,3.02247766 36.232732,4.13014608 36.7183138,5.10756187 C37.0059116,5.68900964 37.3341483,6.34756697 37.6623849,6.56743342 C37.9979157,6.79250998 38.7377507,6.84461103 39.3900559,6.89045996 C40.4727158,6.96548548 41.6991747,7.05197323 42.5317495,7.88350607 C43.3643244,8.71608092 43.4497701,9.94253975 43.5247956,11.0251997 C43.5706445,11.6775049 43.6227456,12.4173399 43.8478222,12.7528706 C44.0687306,13.0821493 44.7262459,13.4093439 45.3076937,13.6979838 C46.2861515,14.1825236 47.3927779,14.7327107 47.8470991,15.8289169 C48.2941262,16.9063667 47.9054523,18.0682203 47.5626274,19.092527 C47.3427609,19.7479583 47.1156003,20.426314 47.196878,20.8337442 C47.2708615,21.2088718 47.7470651,21.7559329 48.1680416,22.2394307 C48.8901622,23.0678375 49.7071068,24.0056565 49.7071068,25.2071068 C49.7071068,26.4095991 48.8901622,27.3474181 48.1680416,28.1758249 C47.7481071,28.6582806 47.2708615,29.2063837 47.196878,29.5825534 C47.1145583,29.9899836 47.3427609,30.6683393 47.5626274,31.3237706 C47.9054523,32.3480773 48.2930842,33.5088888 47.8470991,34.5863387 C47.3917359,35.6835869 46.2840675,36.232732 45.3066517,36.7183138 C44.7252039,37.0069537 44.0666466,37.3341483 43.8467801,37.6623849 C43.6227456,37.9979157 43.5706445,38.7377507 43.5247956,39.3900559 C43.4487281,40.4727158 43.3632824,41.6991747 42.5307075,42.5317495 C41.6981326,43.3643244 40.4706318,43.4497701 39.3890139,43.5247956 C38.7367087,43.5706445 37.9968737,43.6227456 37.6603009,43.8478222 C37.3331063,44.0676886 37.0059116,44.7262459 36.7172718,45.3066517 C36.23169,46.2851095 35.6825449,47.3927779 34.5842546,47.8481411 C33.5068048,48.2930842 32.3470353,47.9054523 31.3216866,47.5626274 C30.6662553,47.3417189 29.9878996,47.1114322 29.5815113,47.196878 C29.2063837,47.2708615 28.6582806,47.7481071 28.1747829,48.1690836 C27.3474181,48.8901622 26.4085571,49.7071068 25.2071068,49.7071068 C24.0056565,49.7071068 23.0667955,48.8901622 22.2394307,48.1690836 Z" />
          <path
            d="M21.6161977,20.2525613 L28.9798341,20.2525613 L33.4360115,31.0280734 C33.8581309,32.0488031 33.3728614,33.2184633 32.3521317,33.6405827 C32.1097775,33.7408075 31.8500775,33.7923882 31.587817,33.7923882 L19.1496613,33.7923882 C18.0450918,33.7923882 17.1496613,32.8969577 17.1496613,31.7923882 C17.1496613,31.5376984 17.1983074,31.2853525 17.292985,31.0489143 L21.6161977,20.2525613 Z"
            stroke="#FFFFFF"
          />
          <path
            d="M29.7002447,19.5831408 L30.8357021,17.6164709 C31.2875714,16.8338103 32.2883557,16.5656509 33.0710164,17.0175203 C33.853677,17.4693896 34.1218364,18.4701739 33.669967,19.2528346 L32.0336034,22.0870995 C31.6591065,22.7357472 30.9075796,23.0310025 30.2156627,22.855868 L28.3811566,22.855868 L28.3811566,26.8357021 C28.3811566,27.3064436 28.2817693,27.7539719 28.1028336,28.1584482 L29.0342496,35.744223 C29.1443876,36.6412254 28.5065081,37.457674 27.6095057,37.567812 C26.7125034,37.6779501 25.8960548,37.0400705 25.7859167,36.1430682 L25.1084294,30.6253761 L25.1084294,35.8357021 C25.1084294,36.7394408 24.3758044,37.4720657 23.4720657,37.4720657 C22.568327,37.4720657 21.8357021,36.7394408 21.8357021,35.8357021 L21.8357021,25.1993384 L21.8357021,23.6647203 L16.9266112,15.1619255 C16.4747418,14.3792648 16.7429012,13.3784805 17.5255618,12.9266112 C18.3082225,12.4747418 19.3090068,12.7429012 19.7608761,13.5255618 L23.4532179,19.9208853 C23.9388274,19.6356343 24.5045266,19.4720657 25.1084294,19.4720657 C25.5000647,19.4720657 25.8756332,19.5408564 26.2237108,19.6670139 C26.3789101,19.6126813 26.5457575,19.5831408 26.7195044,19.5831408 L29.7002447,19.5831408 Z M25.2980159,19.2525613 C26.8795586,19.2525613 28.1616522,17.9704677 28.1616522,16.388925 C28.1616522,14.8073823 26.8795586,13.5252886 25.2980159,13.5252886 C23.7164732,13.5252886 22.4343795,14.8073823 22.4343795,16.388925 C22.4343795,17.9704677 23.7164732,19.2525613 25.2980159,19.2525613 Z"
            stroke="#FFFFFF"
          />
        </g>
      </g>
    </g>
  </IconComponent>
);

export default BoostWallet;