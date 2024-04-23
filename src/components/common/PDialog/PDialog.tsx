import { Button, Dialog } from '@taroify/core';

/** 弹出框组件 */
const PDialog = (props: IPDialog) => {
  const { open, setOpen, className, comfirmFn, btnComfirmClass } = props;
  return (
    <Dialog open={open} onClose={setOpen} className={className}>
      <Dialog.Content>确定删除该用户吗?</Dialog.Content>
      <Dialog.Actions>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={comfirmFn} className={btnComfirmClass}>确认</Button>
        </Dialog.Actions>
      </Dialog.Actions>
    </Dialog>
  );
};

export default PDialog;
