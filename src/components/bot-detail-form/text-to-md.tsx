import { styled } from '@mui/material';

const usedSymbols = ['**', '~~', '__', '||'];

const Spoiler = styled('span')`
    display: inline;
    background-color: ${(p) => p.theme.palette.text.primary};
    color: ${(p) => p.theme.palette.text.primary};
    &:hover {
      cursor: pointer;
      background-color: transparent;
      color: ${(p) => p.theme.palette.background.paper};
  }`;

export default function textToMd(text?: string, count = 0): JSX.Element[] {
  const result: JSX.Element[] = [];
  const compareSymbolPriority: { symbol: string, firstIndex: number }[] = [];

  if (!text) { return []; }

  usedSymbols.forEach((symbol) => {
    const firstIndex = text.indexOf(symbol);
    const secondSymbol = text.includes(symbol, (text.indexOf(symbol) + symbol.length));
    if (secondSymbol) { compareSymbolPriority.push({ symbol, firstIndex }); }
  });

  let minIndex = text?.length;

  let minIndexElement = null;
  for (let i = 0; i < compareSymbolPriority.length; i += 1) {
    if (compareSymbolPriority[i].firstIndex < minIndex) {
      minIndex = compareSymbolPriority[i].firstIndex;
      minIndexElement = compareSymbolPriority[i];
    }
  }

  if (compareSymbolPriority.length === 0) {
    result.push(<span key={`span-${text.length}`}>{text}</span>);
    return result;
  }

  if (minIndexElement) {
    const parts = text.split(minIndexElement.symbol);
    if (parts[0]) { result.push(<span key={`span0-${count}`}>{parts[0]}</span>); }

    if (minIndexElement.symbol === '**') {
      result.push(<b key={`b-${count}`}>{parts[1]}</b>);
    }
    if (minIndexElement.symbol === '__') {
      result.push(<i key={`i-${count}`}>{parts[1]}</i>);
    }
    if (minIndexElement.symbol === '~~') {
      result.push(<s key={`s-${count}`}>{parts[1]}</s>);
    }
    if (minIndexElement.symbol === '||') {
      result.push(<Spoiler key={`spoiler-${count}`}>{parts[1]}</Spoiler>);
    }

    if (parts[2] || parts[3]) {
      const newCount = count + 1;
      result.push(...textToMd(parts.slice(2).join(minIndexElement.symbol), newCount));
    }
    return result;
  }
  return result;
}
