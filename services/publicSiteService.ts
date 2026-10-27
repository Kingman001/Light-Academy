export interface PublicEnquiry {
  kind: 'admissions' | 'contact' | 'tour' | 'newsletter';
  name: string;
  email: string;
  phone?: string;
  message?: string;
  program?: string;
  entryLevel?: string;
  date?: string;
  time?: string;
}

export type EnquiryResult =
  | { status: 'demo'; message: string }
  | { status: 'sent'; message: string };

export interface PublicEnquiryService {
  submit(enquiry: PublicEnquiry): Promise<EnquiryResult>;
}

export const publicEnquiryService: PublicEnquiryService = {
  async submit(_enquiry) {
    return {
      status: 'demo',
      message: 'This is a demonstration form. Nothing was sent or saved. Please contact the school directly using verified contact details.',
    };
  },
};
