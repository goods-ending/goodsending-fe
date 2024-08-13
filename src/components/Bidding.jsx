import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { CircleDollarSign } from "lucide-react";

export function Bidding({ callPostBids, currentHighPrice }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [cash, setCash] = useState(0);
  const [bidPrice, setBidPrice] = useState(currentHighPrice);
  const [balance, setBalance] = useState(0);
  const user = useSelector((state) => state.auth.userData);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    setCash(user.cash);
  }, [user]);

  const handleSubmit = async () => {
    if (bidPrice <= currentHighPrice) {
      alert("입찰 금액은 현재 최대 입찰가보다 커야 합니다.");
      return;
    }
    await callPostBids(bidPrice, 0);
    setIsPopoverOpen(false);

    // setErrorMessage("");
  };

  const handleBidPriceChange = (e) => {
    const value = e.target.value;
    const parsedValue = value ? parseInt(value, 10) : 0;

    setBidPrice(value);
    setBalance(cash - parsedValue);

    if (parsedValue <= currentHighPrice) {
      // setErrorMessage("입찰 금액은 현재 최대 입찰가보다 커야 합니다.");
    } else {
      // setErrorMessage("");
    }
  };

  return (
    <Popover
      className="fixed"
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="text-xl w-1/2 h-14"
          onClick={() => {
            if (!isAuthenticated) {
              alert("로그인해라");
              setIsPopoverOpen(false);
            }
          }}
        >
          <CircleDollarSign className="mr-2" /> 입찰하기
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[310px] bg-white p-4 rounded-lg shadow-lg">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold leading-none">입찰하기</h4>
            <p className="text-sm text-gray-500">
              입찰 신청할 금액을 입력하세요
            </p>
            <p className="text-primary text-sm grid-cols-2 h-4">
              입찰 금액은 현재 최대 입찰가보다 커야 합니다.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="cash">캐쉬 잔액</Label>
              <span className="text-right text-sm">{cash} 원</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="bidPrice">입찰 신청 금액</Label>
              <Input
                id="bidPrice"
                type="number"
                value={bidPrice}
                onChange={handleBidPriceChange}
                className="h-8 text-right"
              />{" "}
            </div>
            {/* <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="balance">입찰 신청 후 잔액</Label>
              <span className="text-right">{balance} 원</span>
            </div> */}
          </div>
          <Button variant="default" onClick={handleSubmit}>
            신청하기
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Bidding;