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
      subheader: string | null;
      cta: ctaStep | null;
      subtext?: string | null;
      disconnect_tip?: string | null;
    };
    loading?: {
      header: string;
      subheader?: string;
      cta?: ctaStep | null;
      subtext?: string | null;
      disconnect_tip?: string | null;
    };
  }
> = {
  0: {
    default: {
      header: "onboarding.demo_header",
      subheader: null,
      cta: null,
    },
    loading: {
      header: "onboarding.demo_header",
    },
  },
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
      subtext: null,
      disconnect_tip: "common.disconnect_tip",
    },
    loading: {
      header: "onboarding.creating_header",
      subheader: "onboarding.creating_subheader",
      cta: null,
      subtext: null,
      disconnect_tip: "common.disconnect_tip",
    },
  },
  3: {
    default: {
      header: "onboarding.enable_header",
      subheader: "onboarding.enable_subheader",
      cta: ctaStep.ENABLE,
      subtext: null,
      disconnect_tip: "common.disconnect_tip",
    },
    loading: {
      header: "onboarding.enabling_header",
      subheader: "onboarding.enabling_subheader",
      cta: null,
      subtext: null,
      disconnect_tip: "common.disconnect_tip",
    },
  },
};

export default stepMapping;
