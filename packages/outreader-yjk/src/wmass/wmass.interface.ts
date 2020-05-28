export interface IWmass {
  information: IInformation;
}

export interface IInformation {
  engineering?: string;
  engineeringCode?: string;
  designer?: string;
  checker?: string;
  software?: string;
  softwareVersion?: string[];
  calDate?: string[];
  allExtracted?: boolean;
}

