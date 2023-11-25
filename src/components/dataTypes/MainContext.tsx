export type MdFileMetaData = {
  slug: string;
  title: string;
  author: string;
  description?: string;
  date: string;
  custom: string;
  uid: string;
};

export type MdSourceTree = {
  slug: string;
  title: string;
  date: string;
};

export type MdFileData = {
  meta: MdFileMetaData;
  content: any;
};
