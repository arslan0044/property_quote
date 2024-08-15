import { proxy } from "valtio";

// Define types based on your schema
type Value = {
  id: number;
  quoteTypeId: number;
  propertyValueStart: number;
  propertyValueEnd: number;
  legalFees: number;
  percentageOfValue: boolean;
  plusFixedFee: boolean;
  pricedOnApplication: boolean;
};

type Supplement = {
  id: number;
  quoteTypeId: number;
  title: string;
  type: string;
  cost: number; // Changed to string
  free: boolean;
  joinQuotes: boolean;
  perIndividual: boolean;
  variable: boolean;
  pricedOnApplication: boolean;
};

type Disbursement = {
  id: number;
  quoteTypeId: number;
  title: string;
  type: string;
  cost: number; // Changed to string
  free: boolean;
  joinQuotes: boolean;
  perIndividual: boolean;
  variable: boolean;
  pricedOnApplication: boolean;
};

type QuoteType = {
  id: number;
  calculatorId: number;
  type: QuoteTypeEnum;
  values: Value[];
  supplements: Supplement[];
  disbursements: Disbursement[];
};

type Calculator = {
  id: number;
  jsonurl: string;
  htmlurl: string;
  name: string;
  
  quoteTypes: QuoteType[];
};

enum QuoteTypeEnum {
  SALE = "SALE",
  PURCHASE = "PURCHASE",
  REMORTGAGE = "REMORTGAGE",
  TRANSFER_OF_EQUITY = "TRANSFER_OF_EQUITY",
}

const defaultQuoteType = {
  feeTable: [
    {
      id: Date.now(),
      quoteTypeId: -1,
      propertyValueStart: 0,
      propertyValueEnd: 100000,
      legalFees: 100,
      percentageOfValue: false,
      plusFixedFee: false,
      pricedOnApplication: false,
    },
  ],
  supplements: [],
  disbursements: [],
};

// Create the Valtio store
const store = proxy<{
  calculators: Calculator[];
  currentCalculator: {
    id?: number;
    name: string;
    htmlurl: string;
    jsonurl: string;
    quoteTypes: Record<
      QuoteTypeEnum,
      {
        feeTable: Value[];
        supplements: Supplement[];
        disbursements: Disbursement[];
      }
    >;
  };
  activeQuoteType: QuoteTypeEnum;
  isAddingCalculator: boolean;
  isSaving: boolean;
}>({
  calculators: [],
  currentCalculator: {
    name: "",
    htmlurl: "",
    jsonurl: "",
    quoteTypes: {
      [QuoteTypeEnum.SALE]: { ...defaultQuoteType },
      [QuoteTypeEnum.PURCHASE]: { ...defaultQuoteType },
      [QuoteTypeEnum.REMORTGAGE]: { ...defaultQuoteType },
      [QuoteTypeEnum.TRANSFER_OF_EQUITY]: { ...defaultQuoteType },
    },
  },
  activeQuoteType: QuoteTypeEnum.SALE,
  isAddingCalculator: false,
  isSaving: false,
});

// Functions to update store
function setCalculatorName(name: string) {
  store.currentCalculator.name = name;
}
function setCalculatorHtmlUrl(htmlurl: string) {
  store.currentCalculator.htmlurl = htmlurl;
}
function setCalculatorJsonUrl(jsonurl: string) {
  store.currentCalculator.jsonurl = jsonurl;
}

function setActiveQuoteType(type: QuoteTypeEnum) {
  store.activeQuoteType = type;
}

function updateFeeTable(type: QuoteTypeEnum, feeTable: Value[]) {
  store.currentCalculator.quoteTypes[type].feeTable = feeTable;
}

function updateSupplements(type: QuoteTypeEnum, supplements: Supplement[]) {
  store.currentCalculator.quoteTypes[type].supplements = supplements;
}

function updateDisbursements(
  type: QuoteTypeEnum,
  disbursements: Disbursement[]
) {
  store.currentCalculator.quoteTypes[type].disbursements = disbursements;
}

function toggleAddingCalculator() {
  store.isAddingCalculator = !store.isAddingCalculator;
  if (!store.isAddingCalculator) {
    // resetCurrentCalculator();
  }
}

function resetCurrentCalculator() {
  store.currentCalculator = {
    name: "",
    htmlurl: "",
    jsonurl: "",
    quoteTypes: {
      [QuoteTypeEnum.SALE]: { ...defaultQuoteType },
      [QuoteTypeEnum.PURCHASE]: { ...defaultQuoteType },
      [QuoteTypeEnum.REMORTGAGE]: { ...defaultQuoteType },
      [QuoteTypeEnum.TRANSFER_OF_EQUITY]: { ...defaultQuoteType },
    },
  };
}

function setIsSaving(isSaving: boolean) {
  store.isSaving = isSaving;
}

function updateCalculator(calculator: Calculator) {
  store.currentCalculator = {
    id: calculator.id,
    name: calculator.name,
    htmlurl: calculator.htmlurl,
    jsonurl: calculator.jsonurl,
    quoteTypes: Object.fromEntries(
      calculator.quoteTypes.map((quoteType) => [
        quoteType.type,
        {
          feeTable: quoteType.values.map((value) => ({
            ...value,
            propertyValueStart: Number(value.propertyValueStart),
            propertyValueEnd: Number(value.propertyValueEnd),
            legalFees: Number(value.legalFees),
          })),
          supplements: quoteType.supplements.map((supplement) => ({
            ...supplement,
            cost: supplement.cost,
          })),
          disbursements: quoteType.disbursements.map((disbursement) => ({
            ...disbursement,
            cost: disbursement.cost,
          })),
        },
      ])
    ) as Record<
      QuoteTypeEnum,
      {
        feeTable: Value[];
        supplements: Supplement[];
        disbursements: Disbursement[];
      }
    >,
  };
}

export {
  store,
  QuoteTypeEnum,
  setCalculatorName,
  setCalculatorHtmlUrl,
  setCalculatorJsonUrl,
  setActiveQuoteType,
  updateFeeTable,
  updateSupplements,
  updateDisbursements,
  toggleAddingCalculator,
  setIsSaving,
  updateCalculator,
  resetCurrentCalculator,
};
