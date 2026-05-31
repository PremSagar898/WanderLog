import { useAuth } from '../context/AuthContext';
import { BucketListProvider } from '../context/BucketListContext';

export function BucketListScope({ children }) {
  const { auth } = useAuth();
  const storageKey = auth.user?.email ? `wanderlog-bucket:${auth.user.email}` : null;

  return (
    <BucketListProvider key={storageKey || 'guest'} storageKey={storageKey}>
      {children}
    </BucketListProvider>
  );
}

export default BucketListScope;