import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const UsersThreeGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M30.6004 18.8C30.4953 18.8788 30.3758 18.9361 30.2486 18.9687C30.1213 19.0013 29.989 19.0085 29.859 18.9899C29.729 18.9714 29.6039 18.9274 29.4909 18.8605C29.3779 18.7936 29.2792 18.7051 29.2004 18.6C28.5976 17.7898 27.8131 17.1325 26.9099 16.6809C26.0068 16.2293 25.0102 15.9961 24.0004 16C23.8037 16 23.6115 15.942 23.4476 15.8333C23.2837 15.7245 23.1556 15.5699 23.0791 15.3887C23.0272 15.2657 23.0005 15.1335 23.0005 15C23.0005 14.8665 23.0272 14.7343 23.0791 14.6112C23.1556 14.4301 23.2837 14.2755 23.4476 14.1667C23.6115 14.058 23.8037 14 24.0004 14C24.5615 13.9999 25.1113 13.8425 25.5874 13.5457C26.0635 13.2488 26.4469 12.8244 26.6938 12.3205C26.9408 11.8167 27.0416 11.2538 26.9846 10.6956C26.9277 10.1374 26.7154 9.60634 26.3717 9.16278C26.0281 8.71921 25.567 8.3809 25.0408 8.18627C24.5145 7.99164 23.9442 7.94849 23.3947 8.06173C22.8451 8.17496 22.3384 8.44004 21.9319 8.82686C21.5255 9.21368 21.2357 9.70672 21.0954 10.25C21.0625 10.3772 21.005 10.4967 20.926 10.6017C20.847 10.7067 20.748 10.795 20.6349 10.8618C20.5217 10.9285 20.3965 10.9723 20.2664 10.9907C20.1363 11.009 20.0038 11.0016 19.8766 10.9687C19.7494 10.9359 19.6299 10.8783 19.5249 10.7993C19.42 10.7203 19.3316 10.6214 19.2648 10.5082C19.1981 10.3951 19.1543 10.2698 19.136 10.1398C19.1176 10.0097 19.125 9.87721 19.1579 9.75C19.3526 8.99664 19.7204 8.29912 20.2321 7.71294C20.7438 7.12675 21.3853 6.66809 22.1054 6.37343C22.8256 6.07878 23.6046 5.95627 24.3804 6.01566C25.1563 6.07505 25.9075 6.31469 26.5745 6.71551C27.2414 7.11634 27.8056 7.66729 28.2221 8.32452C28.6386 8.98175 28.896 9.72713 28.9738 10.5013C29.0516 11.2756 28.9476 12.0572 28.6701 12.7842C28.3926 13.5111 27.9493 14.1633 27.3754 14.6887C28.7351 15.2775 29.9172 16.2118 30.8041 17.3987C30.8829 17.5041 30.9402 17.6239 30.9726 17.7514C31.005 17.8789 31.0119 18.0115 30.993 18.1416C30.9741 18.2718 30.9296 18.397 30.8623 18.5099C30.7949 18.6229 30.7059 18.7215 30.6004 18.8ZM23.8654 26.5C23.9377 26.6138 23.9863 26.7411 24.0082 26.8742C24.0301 27.0073 24.0248 27.1434 23.9928 27.2744C23.9607 27.4054 23.9024 27.5285 23.8215 27.6364C23.7406 27.7443 23.6387 27.8347 23.5219 27.9022C23.4051 27.9697 23.2759 28.0129 23.142 28.0292C23.0082 28.0454 22.8724 28.0344 22.7428 27.9969C22.6133 27.9593 22.4927 27.8959 22.3883 27.8105C22.2839 27.7251 22.1979 27.6195 22.1354 27.5C21.5054 26.4333 20.6083 25.5493 19.5324 24.9352C18.4565 24.3212 17.2392 23.9982 16.0004 23.9982C14.7616 23.9982 13.5442 24.3212 12.4683 24.9352C11.3925 25.5493 10.4953 26.4333 9.86538 27.5C9.80286 27.6195 9.71682 27.7251 9.61243 27.8105C9.50803 27.8959 9.38744 27.9593 9.25792 27.9969C9.12839 28.0344 8.9926 28.0454 8.85871 28.0292C8.72483 28.0129 8.59562 27.9697 8.47885 27.9022C8.36209 27.8347 8.26018 27.7443 8.17926 27.6364C8.09835 27.5285 8.0401 27.4054 8.00801 27.2744C7.97592 27.1434 7.97066 27.0073 7.99255 26.8742C8.01444 26.7411 8.06303 26.6138 8.13538 26.5C9.10488 24.8342 10.5831 23.5233 12.3529 22.76C11.357 21.9975 10.6252 20.9422 10.2601 19.7423C9.89509 18.5424 9.91525 17.2582 10.3178 16.0704C10.7203 14.8825 11.4849 13.8507 12.5042 13.1198C13.5235 12.389 14.7462 11.996 16.0004 11.996C17.2546 11.996 18.4773 12.389 19.4965 13.1198C20.5158 13.8507 21.2805 14.8825 21.683 16.0704C22.0855 17.2582 22.1057 18.5424 21.7406 19.7423C21.3756 20.9422 20.6437 21.9975 19.6479 22.76C21.4176 23.5233 22.8959 24.8342 23.8654 26.5ZM16.0004 22C16.7915 22 17.5649 21.7654 18.2227 21.3259C18.8805 20.8863 19.3931 20.2616 19.6959 19.5307C19.9986 18.7998 20.0779 17.9956 19.9235 17.2196C19.7692 16.4437 19.3882 15.731 18.8288 15.1716C18.2694 14.6122 17.5567 14.2312 16.7807 14.0769C16.0048 13.9225 15.2006 14.0017 14.4696 14.3045C13.7387 14.6072 13.114 15.1199 12.6745 15.7777C12.235 16.4355 12.0004 17.2089 12.0004 18C12.0004 19.0609 12.4218 20.0783 13.172 20.8284C13.9221 21.5786 14.9395 22 16.0004 22ZM9.00038 15C9.00038 14.7348 8.89502 14.4804 8.70749 14.2929C8.51995 14.1054 8.2656 14 8.00038 14C7.43929 13.9999 6.88946 13.8425 6.41334 13.5457C5.93722 13.2488 5.5539 12.8244 5.30692 12.3205C5.05994 11.8167 4.95919 11.2538 5.01613 10.6956C5.07306 10.1374 5.2854 9.60634 5.62901 9.16278C5.97263 8.71921 6.43375 8.3809 6.96 8.18627C7.48626 7.99164 8.05654 7.94849 8.60609 8.06173C9.15563 8.17496 9.66241 8.44004 10.0688 8.82686C10.4753 9.21368 10.7651 9.70672 10.9054 10.25C10.9717 10.5069 11.1373 10.727 11.3659 10.8618C11.5945 10.9966 11.8672 11.0351 12.1241 10.9687C12.3811 10.9024 12.6011 10.7368 12.7359 10.5082C12.8707 10.2797 12.9092 10.0069 12.8429 9.75C12.6482 8.99664 12.2803 8.29912 11.7686 7.71294C11.2569 7.12675 10.6155 6.66809 9.89532 6.37343C9.17516 6.07878 8.39617 5.95627 7.62033 6.01566C6.84449 6.07505 6.09321 6.31469 5.42629 6.71551C4.75936 7.11634 4.19519 7.66729 3.77866 8.32452C3.36212 8.98175 3.10473 9.72713 3.02697 10.5013C2.9492 11.2756 3.05319 12.0572 3.33068 12.7842C3.60817 13.5111 4.0515 14.1633 4.62538 14.6887C3.26698 15.278 2.08627 16.2123 1.20038 17.3987C1.04108 17.6109 0.972598 17.8777 1.00999 18.1404C1.04738 18.403 1.18758 18.6401 1.39975 18.7994C1.61193 18.9587 1.87869 19.0272 2.14136 18.9898C2.40403 18.9524 2.64108 18.8122 2.80038 18.6C3.40311 17.7898 4.18765 17.1325 5.09083 16.6809C5.99401 16.2293 6.9906 15.9961 8.00038 16C8.2656 16 8.51995 15.8946 8.70749 15.7071C8.89502 15.5196 9.00038 15.2652 9.00038 15Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default UsersThreeGraph;