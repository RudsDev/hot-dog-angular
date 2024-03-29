


type DialogConf = {
  header: string;
  message: string;
  accept: Function;
  reject?: Function;
}

export interface Dialog {
  showDialog(config: DialogConf): void
}
