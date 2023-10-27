import * as z from 'zod';

export const BotDetailSchema = z.object({
  bot: z.object({
    id: z.any().nullish(),
    name: z.string().nonempty({ message: 'validation.required' }),
    token: z.string().nonempty({ message: 'validation.required' }),
    description: z.string().nonempty({ message: 'validation.required' }),
  }),
  paynet: z.object({
    url: z.string().nonempty({ message: 'validation.required' }),
    endpoint: z.string().nonempty({ message: 'validation.required' }),
    controlKey: z.string().nonempty({ message: 'validation.required' }),
    login: z.string().nonempty({ message: 'validation.required' }),
  }),
  texts: z.object({
    transactionDescription: z.string().nonempty({ message: 'validation.required' }),
    cardNumberLabel: z.string().nonempty({ message: 'validation.required' }),
    expiresLabel: z.string().nonempty({ message: 'validation.required' }),
    cvvLabel: z.string().nonempty({ message: 'validation.required' }),
    otpLabel: z.string().nonempty({ message: 'validation.required' }),
    otpMessage: z.string().nonempty({ message: 'validation.required' }),
    transactionLoading: z.string().nonempty({ message: 'validation.required' }),
    transactionSuccess: z.string().nonempty({ message: 'validation.required' }),
    transactionSuccessDescription: z.string().nonempty({ message: 'validation.required' }),
    transactionError: z.string().nonempty({ message: 'validation.required' }),
  }),
});

export type BotDetail = z.infer<typeof BotDetailSchema>;

export const ShortBotSchema = z.object({
  id: z.number(),
  name: z.string().nonempty({ message: 'validation.required' }),
  paynetUrl: z.string().nonempty({ message: 'validation.required' }),
  paynetEndpoint: z.string().nonempty({ message: 'validation.required' }),
});

export type ShortBot = z.infer<typeof ShortBotSchema>;
