export const enum ctaStep {
  CONNECT = "CONNECT",
  CREATE = "CREATE",
  ENABLE = "ENABLE",
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
      header: string;
      subheader: string;
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
      subtext: "common.disconnect_tip",
    },
    loading: {
      header: "onboarding.creating_header",
      subheader: "onboarding.creating_subheader",
      cta: null,
      subtext: "common.disconnect_tip",
    },
  },
  3: {
    default: {
      header: "onboarding.enable_header",
      subheader: "onboarding.enable_subheader",
      cta: ctaStep.ENABLE,
      subtext: "common.disconnect_tip",
    },
    loading: {
      header: "onboarding.enabling_header",
      subheader: "onboarding.enabling_subheader",
      cta: null,
      subtext: "common.disconnect_tip",
    },
  },
};

export default stepMapping;
