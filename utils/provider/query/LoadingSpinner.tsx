import { useIsFetching } from 'react-query';
import { ClipLoader } from 'react-spinners';
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  zIndex: 1000,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function LoadingSpinner({ children }: React.PropsWithChildren) {
  const isFetching = useIsFetching();

  if (isFetching > 0) {
    return <ClipLoader cssOverride={override} />;
  } else {
    return <>{children}</>;
  }
}
