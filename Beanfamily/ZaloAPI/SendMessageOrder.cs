using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ZaloDotNetSDK;

namespace Beanfamily.ZaloAPI
{
    public class SendMessageOrder
    {
        public void ThongBaoDonDatHang(string message)
        {
            ZaloClient client = new ZaloClient("H4rBHgacMaj6J411go1RIKX2JqMZDmHB5I5389O_1Iaz8X5SWGnQLMmcDIhlEbTnOYr50_Kk2KnfJ4KtvNO3K7juS5tYQZ4wJaGbFzrTHsjkP3HkvWz06Nuy6dNcB5fvU1yt7k4kP6iNF7O_ebCNH3ib106P94PJ5JSTAA0VKbmVD49HXXuu7X0G8dACU5Ht6Kv2F9L-4smMTbSKermH6Gn8PdoxOpKkLcmkQjLRJYuuBJzgXGD5D0ao4twqCLumFGykG9KoLpHvMJb_vcnH87nTDtJBRKu0PW8hMD0tPp5i9tDBWoC_H1KkSX2H81HE14jR1fPJ3tSYV4y8Y49KVZHpGMwrU1PWLsrdEluR9KHH3KmmpcOUG5XC42_vH6PyQtHs0-zrEau5GYa-jcjjMZX-119sIjjR8pshE5bA");
            JObject result = client.getListFollower(0, 20);
        }
    }
}