import InformationIcon from 'icons/Information';
import VoteIcon from 'icons/Vote';
import CloseRoundedIcon from 'icons/CloseRounded';

const toastTypes = {
  success: {
    color: '#23bc47',
    icon: (
      <VoteIcon
        size={[29, 29]}
        className="mr-3"
        stroke="#23bc47"
        fill="#23bc47"
      />
    ),
  },
  info: {
    color: '#3a87ad',
    icon: <InformationIcon className="mr-3" stroke="#576FED" fill="#576FED" />,
  },
  warning: {
    color: '#c09853',
  },
  error: {
    color: '#f76f60',
    icon: <CloseRoundedIcon size={[29, 29]} className="mr-3" fill="#f76f60" />,
  },
};

export default toastTypes;
