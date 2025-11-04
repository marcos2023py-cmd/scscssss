import ErrorModal from '../ErrorModal';

export default function ErrorModalExample() {
  return <ErrorModal onClose={() => console.log('Close error modal')} />;
}
