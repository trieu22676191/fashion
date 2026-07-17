"use client";

import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function PolicyPage() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <main className={styles.mainContainer}>
        <div className={styles.header}>
          <h1>Chính sách & Miễn trừ trách nhiệm</h1>
          <p className={styles.lastUpdated}><strong>Cập nhật lần cuối:</strong> 18/07/2026</p>
        </div>

        <div className={styles.content}>
          <section>
            <h2>1. Mục đích của website</h2>
            <p>Website này được xây dựng <strong>phục vụ mục đích học tập, nghiên cứu công nghệ và trình diễn kỹ năng phát triển website (Portfolio)</strong>.</p>
            <p>Toàn bộ sản phẩm, hình ảnh, thông tin và các chức năng trên website chỉ nhằm mô phỏng một cửa hàng thời trang trực tuyến và <strong>không đại diện cho hoạt động kinh doanh thực tế</strong>.</p>
          </section>

          <section>
            <h2>2. Không thực hiện giao dịch thương mại</h2>
            <p>Website <strong>không bán hàng</strong>, <strong>không nhận đặt hàng</strong>, <strong>không xử lý thanh toán</strong> và <strong>không thu bất kỳ khoản tiền nào</strong> từ người dùng.</p>
            <p>Mọi thao tác như:</p>
            <ul>
              <li>Thêm sản phẩm vào giỏ hàng</li>
              <li>Đặt hàng</li>
              <li>Thanh toán</li>
              <li>Đăng ký tài khoản</li>
              <li>Đánh giá sản phẩm</li>
            </ul>
            <p>đều chỉ nhằm mục đích trình diễn chức năng của hệ thống.</p>
            <p>Nếu người dùng gửi đơn đặt hàng hoặc thông tin mua hàng, dữ liệu sẽ chỉ được sử dụng để mô phỏng quá trình hoạt động của website và <strong>không được xử lý như một đơn hàng thực tế</strong>.</p>
          </section>

          <section>
            <h2>3. Thông tin sản phẩm</h2>
            <p>Các sản phẩm xuất hiện trên website được sử dụng để minh họa giao diện và trải nghiệm người dùng.</p>
            <p>Các thông tin như:</p>
            <ul>
              <li>Tên sản phẩm</li>
              <li>Hình ảnh</li>
              <li>Giá bán</li>
              <li>Màu sắc</li>
              <li>Kích thước</li>
              <li>Mô tả</li>
            </ul>
            <p>chỉ mang tính minh họa và có thể không phản ánh bất kỳ sản phẩm thực tế nào.</p>
          </section>

          <section>
            <h2>4. Hình ảnh và bản quyền</h2>
            <p>Một số hình ảnh hoặc tài nguyên hiển thị trên website có thể được sử dụng cho mục đích học tập, nghiên cứu hoặc minh họa giao diện.</p>
            <p>Nếu bạn là chủ sở hữu của bất kỳ nội dung nào và cho rằng việc sử dụng là chưa phù hợp, vui lòng liên hệ để chúng tôi xem xét và xử lý trong thời gian sớm nhất.</p>
          </section>

          <section>
            <h2>5. Dữ liệu người dùng</h2>
            <p>Website có thể lưu trữ một số dữ liệu phục vụ việc kiểm thử hoặc trình diễn chức năng, bao gồm:</p>
            <ul>
              <li>Tài khoản thử nghiệm</li>
              <li>Danh sách yêu thích</li>
              <li>Giỏ hàng</li>
              <li>Đơn hàng mô phỏng</li>
            </ul>
            <p>Các dữ liệu này <strong>không được sử dụng cho mục đích thương mại</strong>.</p>
            <p>Người dùng không nên nhập các thông tin nhạy cảm như:</p>
            <ul>
              <li>Thông tin thẻ ngân hàng</li>
              <li>Mật khẩu của các tài khoản khác</li>
              <li>Căn cước công dân</li>
              <li>Thông tin tài chính hoặc dữ liệu cá nhân quan trọng</li>
            </ul>
          </section>

          <section>
            <h2>6. Giới hạn trách nhiệm</h2>
            <p>Chủ sở hữu website không chịu trách nhiệm đối với:</p>
            <ul>
              <li>Các hiểu nhầm về việc website đang kinh doanh thực tế.</li>
              <li>Các yêu cầu mua bán hoặc giao dịch phát sinh từ người dùng.</li>
              <li>Bất kỳ thiệt hại nào phát sinh do việc sử dụng website ngoài mục đích trải nghiệm hoặc học tập.</li>
            </ul>
          </section>

          <section>
            <h2>7. Thay đổi nội dung</h2>
            <p>Nội dung website có thể được chỉnh sửa, cập nhật hoặc xóa bất kỳ lúc nào mà không cần thông báo trước nhằm phục vụ quá trình học tập, nghiên cứu và phát triển dự án.</p>
          </section>

          <section>
            <h2>8. Liên hệ</h2>
            <p>Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào về dự án, vui lòng liên hệ thông qua trang <strong>Liên hệ (Contact)</strong> trên website.</p>
          </section>

          <div className={styles.noticeBox}>
            <h3>Thông báo</h3>
            <p><strong>Lưu ý:</strong> Đây là website <strong>Portfolio cá nhân</strong> được xây dựng nhằm mục đích học tập và trình diễn kỹ năng phát triển web. Website <strong>không kinh doanh</strong>, <strong>không nhận đơn hàng</strong>, <strong>không hỗ trợ thanh toán</strong> và mọi thông tin sản phẩm chỉ mang tính minh họa.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
