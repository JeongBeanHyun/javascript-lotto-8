class ResultService {
  static countMatches(userNumbers, winningNumbers) {
    return userNumbers.filter((userLotto) => winningNumbers.includes(userLotto))
      .length;
  }

  static getRank(matches, hasBonus) {
    if (matches === 6) return 1;
    if (matches === 5 && hasBonus) return 2;
    if (matches === 5) return 3;
    if (matches === 4) return 4;
    if (matches === 3) return 5;
    return null;
  }

  static prizeTable = {
    1: 2000000000,
    2: 30000000,
    3: 1500000,
    4: 50000,
    5: 5000,
  };

  static summarizeRanks(tickets, winning, bonus) {
    const summary = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    for (const ticket of tickets) {
      const matches = ResultService.countMatches(ticket, winning);
      const hasBonus = ticket.includes(bonus);
      const rank = ResultService.getRank(matches, hasBonus);
      if (rank) summary[rank] += 1;
    }

    return summary;
  }

  static calculateTotalPrize(summary) {
    let total = 0;

    for (let rank = 1; rank <= 5; rank++) {
      const count = summary[rank];
      const prize = ResultService.prizeTable[rank];
      total += count * prize;
    }

    return total;
  }

  static calculateEarningRate(totalPrize, purchaseAmount) {
    if (purchaseAmount <= 0) return 0;
    const rate = (totalPrize / purchaseAmount) * 100;
    return Number(rate.toFixed(1));
  }
}

export default ResultService;
