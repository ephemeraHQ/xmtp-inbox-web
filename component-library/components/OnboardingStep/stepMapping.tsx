export const enum ctaStep {
  CONNECT = "CONNECT",
  CREATE = "CREATE",
  ENABLE = "ENABLE",
  CONNECT_AGAIN = "CONNECT AGAIN",
}

export const stepMapping: Record<
  number,
  {
    default: {
      header: string;
      subheader: string;
      cta: ctaStep;
      subtext?: string | null;
    };
    loading: {
      header: string | null;
      subheader: string | null;
      cta: ctaStep | null;
      subtext?: string | null;
    };
  }
> = {
  1: {
    default: {
      header: "onboarding.intro_header",
      subheader: "onboarding.intro_subheader",
      cta: ctaStep.CONNECT,
      subtext: "common.private_key_note",
    },
    loading: {
      header: "onboarding.connect_header",
      subheader: "onboarding.connect_subheader",
      cta: null,
      subtext: "common.private_key_note",
    },
  },
  2: {
    default: {
      header: "onboarding.create_header",
      subheader: "onboarding.create_subheader",
      cta: ctaStep.CREATE,
    },
    loading: {
      header: "onboarding.creating_header",
      subheader: "onboarding.creating_subheader",
      cta: null,
      subtext: null,
    },
  },
  3: {
    default: {
      header: "onboarding.enable_header",
      subheader: "onboarding.enable_subheader",
      cta: ctaStep.ENABLE,
      subtext: null,
    },
    loading: {
      header: "onboarding.enabling_header",
      subheader: "onboarding.enabling_subheader",
      cta: null,
      subtext: null,
    },
  },
  0: {
    default: {
      header: "onboarding.error_header",
      subheader: "onboarding.error_subheader",
      cta: ctaStep.CONNECT_AGAIN,
      subtext: "common.private_key_note",
    },
    loading: {
      header: null,
      subheader: null,
      cta: null,
      subtext: null,
    },
  },
};

export default stepMapping;
