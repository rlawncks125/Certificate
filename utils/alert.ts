export const useAlert = () => {
  const { $toastAlert, $toastAlertSuccess, $toastError } = useNuxtApp();

  const base = (msg: string) => {
    $toastAlert(msg);
  };

  const success = (msg: string) => {
    $toastAlertSuccess(msg);
  };
  const fail = (msg: string) => {
    $toastError(msg);
  };

  return { base, success, fail };
};

export default useAlert;
